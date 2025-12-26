import supabase from "../config/db.js";
import sendEmail from "../utils/sendEmail.js";

export const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Insert contact into Supabase
    const { data: contact, error } = await supabase
      .from("contacts")
      .insert([
        {
          name,
          email,
          subject,
          message,
          ip_address: req.ip,
          status: "new",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Send email notification (optional - don't fail if email not configured)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
        const emailContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr>
          <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
        `;

        await sendEmail({
          to: process.env.EMAIL_USER,
          subject: `Portfolio Contact: ${subject}`,
          html: emailContent,
        });

        // Send confirmation email to user
        const confirmationEmail = `
          <h2>Thank you for contacting me!</h2>
          <p>Hi ${name},</p>
          <p>I've received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <br>
          <p>Best regards,<br>Mritunjai Singh</p>
        `;

        await sendEmail({
          to: email,
          subject: "Message Received - Mritunjai Singh",
          html: confirmationEmail,
        });
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully! I will get back to you soon.",
      data: { id: contact.id },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const { data: contacts, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};
