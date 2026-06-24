const nodemailer = require('nodemailer');

// Store contact submissions (in-memory, would use database in production)
let contactSubmissions = [];

const contactController = {
     submitContactForm: async (req, res) => {
          try {
               const { name, email, subject, message } = req.body;

               // Validation
               if (!name || !email || !subject || !message) {
                    return res.status(400).json({ error: 'All fields are required' });
               }

               if (name.trim().length < 2) {
                    return res.status(400).json({ error: 'Name must be at least 2 characters' });
               }

               if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    return res.status(400).json({ error: 'Invalid email format' });
               }

               if (subject.trim().length < 5) {
                    return res.status(400).json({ error: 'Subject must be at least 5 characters' });
               }

               if (message.trim().length < 10) {
                    return res.status(400).json({ error: 'Message must be at least 10 characters' });
               }

               // Create submission record
               const submission = {
                    id: Date.now(),
                    name: name.trim(),
                    email: email.trim(),
                    subject: subject.trim(),
                    message: message.trim(),
                    submittedAt: new Date(),
               };

               // Store submission
               contactSubmissions.push(submission);

               // Send email to admin
               await sendAdminEmail(submission);

               // Send confirmation email to user
               await sendUserConfirmationEmail(submission);

               res.status(200).json({
                    success: true,
                    message: 'Thank you! Your message has been sent successfully.',
                    submissionId: submission.id,
               });
          } catch (error) {
               console.error('Contact form error:', error);
               res.status(500).json({ error: 'Failed to submit contact form', details: error.message });
          }
     },

     getContactSubmissions: (req, res) => {
          try {
               res.json({
                    total: contactSubmissions.length,
                    submissions: contactSubmissions,
               });
          } catch (error) {
               res.status(500).json({ error: 'Failed to retrieve submissions' });
          }
     },

     getSubmissionById: (req, res) => {
          try {
               const submission = contactSubmissions.find((s) => s.id === parseInt(req.params.id));
               if (!submission) {
                    return res.status(404).json({ error: 'Submission not found' });
               }
               res.json(submission);
          } catch (error) {
               res.status(500).json({ error: 'Failed to retrieve submission' });
          }
     },
};

// Email transporter setup
const transporter = nodemailer.createTransport({
     service: process.env.EMAIL_SERVICE || 'gmail',
     auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
     },
});

// Send email to admin
const sendAdminEmail = async (submission) => {
     // Skip email if credentials not configured
     if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
          console.log('Email service not configured. Submission stored locally:', submission);
          return;
     }

     const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_SEND_USER,
          subject: `New Contact Form Submission: ${submission.subject}`,
          html: `
               <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">New Contact Form Submission</h2>
                    <p><strong>From:</strong> ${submission.name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${submission.email}">${submission.email}</a></p>
                    <p><strong>Subject:</strong> ${submission.subject}</p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <h3>Message:</h3>
                    <p style="white-space: pre-wrap; line-height: 1.6;">${submission.message}</p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">Submitted on: ${submission.submittedAt.toLocaleString()}</p>
               </div>
          `,
     };

     await transporter.sendMail(mailOptions);
};

// Send confirmation email to user
const sendUserConfirmationEmail = async (submission) => {
     // Skip email if credentials not configured
     if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
          console.log('Email service not configured. User confirmation skipped.');
          return;
     }

     const mailOptions = {
          from: process.env.EMAIL_USER,
          to: submission.email,
          subject: 'We received your message - EcomStore',
          html: `
               <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Thank you for contacting us!</h2>
                    <p>Hi ${submission.name},</p>
                    <p>We have received your message and will get back to you as soon as possible.</p>
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                         <p><strong>Subject:</strong> ${submission.subject}</p>
                         <p><strong>Submission ID:</strong> ${submission.id}</p>
                         <p><strong>Date:</strong> ${submission.submittedAt.toLocaleString()}</p>
                    </div>
                    <p>If you have any urgent matters, please feel free to reach out directly.</p>
                    <p>Best regards,<br/>EcomStore Team</p>
               </div>
          `,
     };

     await transporter.sendMail(mailOptions);
};

module.exports = contactController;
