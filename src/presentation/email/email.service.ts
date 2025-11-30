import nodemailer from 'nodemailer'
import {envs} from "../../config/plugins/envs.plugin";
import {LogRepository} from "../../domain/repository/log.repository";
import {LogEntity, LogSeverityLevel} from "../../domain/entities/log.entity";
import {Logger} from "nodemailer/lib/shared";

interface SendEmailOptions {
    to          : string | string[]
    subject     : string
    html        : string
    attachments?: Attachment[]
}

interface Attachment {
    filename: string
    path: string
}

export class EmailService {
    private readonly origin = 'email.service.ts';

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor() {}

    async sendEmail({to, subject, html, attachments = []}: SendEmailOptions): Promise<boolean> {
        try {

            const sentMessageInformation = await this.transporter
                .sendMail({to, subject, html, attachments})

            return true
        } catch (error) {
            return false
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
        const subject = 'Server logs'
        const html = `
            <!doctype html>
            <html>
              <body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px;">
                <div style="max-width:500px;margin:auto;background:#ffffff;padding:20px;border-radius:6px;">
                  <h2 style="margin:0 0 10px;">System Log Report</h2>
                  <p style="margin:0 0 16px;">
                    This email contains the latest file system logs collected from the monitoring service.
                    The log files are attached for your review.
                  </p>
                  <p style="margin:0 0 10px;">Please check the attachments to view the recorded events.</p>
                  <p style="font-size:12px;color:#777;margin-top:20px;">
                    This message was generated automatically. No action is required unless an issue is detected.
                  </p>
                </div>
              </body>
            </html>
        `
        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
        ]

        return this.sendEmail({to, subject, html, attachments})
    }

}