import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Connect to MongoDB and save message
        try {
            await dbConnect();
            await Contact.create({ name, email, message });
        } catch (dbError) {
            console.error('Database connection or save error:', dbError);
            // We continue with email even if DB fails, or we could fail here.
            // Deciding to continue so the user still gets the email notification.
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New message from ${name} — Portfolio`,
            html: `
                <div style="font-family: monospace; background: #050505; color: #ffffff; padding: 32px; border-radius: 8px; border: 1px solid rgba(0,240,255,0.2);">
                    <h2 style="color: #00f0ff; margin-bottom: 24px; letter-spacing: 2px;">NEW PORTFOLIO MESSAGE</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <td style="padding: 12px 0; color: rgba(255,255,255,0.5); width: 100px;">NAME</td>
                            <td style="padding: 12px 0; color: #ffffff;">${name}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <td style="padding: 12px 0; color: rgba(255,255,255,0.5);">EMAIL</td>
                            <td style="padding: 12px 0; color: #00f0ff;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; color: rgba(255,255,255,0.5); vertical-align: top;">MESSAGE</td>
                            <td style="padding: 12px 0; color: #ffffff; white-space: pre-wrap;">${message}</td>
                        </tr>
                    </table>
                </div>
            `,
        });

        // Confirmation email to the visitor
        await transporter.sendMail({
            from: `"Ashwani Kumar" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Got your message, ${name}! 👋`,
            html: `
                <div style="font-family: monospace; background: #050505; color: #ffffff; padding: 32px; border-radius: 8px; border: 1px solid rgba(0,240,255,0.2); max-width: 560px; margin: auto;">
                    <h2 style="color: #00f0ff; margin-bottom: 8px; letter-spacing: 2px;">MESSAGE RECEIVED</h2>
                    <p style="color: rgba(255,255,255,0.6); margin-bottom: 24px; font-size: 13px;">Thanks for reaching out, ${name}.</p>

                    <p style="color: rgba(255,255,255,0.85); line-height: 1.7; font-size: 14px;">
                        Your message has been received and I'll get back to you as soon as possible — usually within 24–48 hours.
                    </p>

                    <div style="margin-top: 28px; padding: 16px; background: rgba(0,240,255,0.05); border-left: 2px solid #00f0ff; border-radius: 4px;">
                        <p style="color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Your message</p>
                        <p style="color: rgba(255,255,255,0.7); font-size: 13px; white-space: pre-wrap;">${message}</p>
                    </div>

                    <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin-top: 32px; letter-spacing: 1px;">
                        — Ashwani Kumar / Full Stack Developer
                    </p>
                </div>
            `,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
