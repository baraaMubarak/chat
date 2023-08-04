module.exports = (userName,code) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="rtl" lang="ar" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" lang="en">

<head>
<link rel="stylesheet" type="text/css" hs-webfonts="true" href="https://fonts.googleapis.com/css?family=Lato|Lato:i,b,bi">
    <title>Email template</title>
    <meta property="og:title" content="Email template">

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style type="text/css">

        a{
            text-decoration: underline;
            color: inherit;
            font-weight: bold;
            color: #253342;
        }

        h1 {
            font-size: 56px;
        }

        h2{
            font-size: 28px;
            font-weight: 900;
        }

        p {
            font-weight: 100;
            font-size: 24px;
        }

        td {
            vertical-align: top;
        }

        #email {
            margin: auto;
            width: 600px;
            background-color: white;
        }

        button{
            font: inherit;
            background-color: #FF7A59;
            border: none;
            padding: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 900;
            color: white;
            border-radius: 5px;
            box-shadow: 3px 3px #d94c53;
        }

        .subtle-link {
            font-size: 9px;
            text-transform:uppercase;
            letter-spacing: 1px;
            color: #CBD6E2;
        }
        body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
    }

    
    .secret-code {
      display: inline-block;
      padding: 20px 40px;
      background-color: #f5f5f5;
      color: #333333;
      border-radius: 5px;
      font-size: 50px;
      font-weight: bold;
      align-items: center;
      align-content: center;
       alignment-baseline: center;
       align-self: center;
    }

    </style>

</head>

<body bgcolor="#F5F8FA" style="width: 100%; margin: auto 0; padding:0; font-family:Lato, sans-serif; font-size:18px; color:#33475B; word-break:break-word">

<! View in Browser Link -->

<div id="email">
    <table align="right" role="presentation">
        <tr>
            <td>
                <a class="subtle-link" href="#">View in Browser</a>
            </td>
        <tr>
    </table>


    <! Banner -->
    <table role="presentation" width="100%">
        <tr>

            <td bgcolor="#00A4BD" align="center" style="color: white;">

                <img alt="Flower" src="https://hs-8886753.f.hubspotemail.net/hs/hsstatic/TemplateAssets/static-1.60/img/hs_default_template_images/email_dnd_template_images/ThankYou-Flower.png" width="400px" align="middle">

                <h1 dir="rtl" lang="ar"> مرحبا!<br></br>${userName}</h1>

            </td>
    </table>




    <! First Row -->

    <table role="presentation" border="0" cellpadding="0" cellspacing="10px" style="padding: 30px 30px 30px 60px;">
        <tr>
    <td align="center" dir="rtl" lang="ar">
    <h2 dir="rtl">مرحبا صديقي ${userName} أنا براء مطور التطبيق</h2>
    <p>أنا متأسف جدًا لما حدث معك في تطبيقنا. يبدو أنك نسيت كلمة المرور الخاصة بك. لكن لا تقلق، نحن نثق بك تمامًا يا ${userName}، ونحبك من كل قلبنا.</p>
    <p>لذلك أعطيتك رمزًا خاصًا، احفظه واستخدمه داخل التطبيق لتستعيد وصولك. وتذكر، هذا الرمز سري بيننا فقط 😉❤️</p>

    <!-- Secret Code -->
   <h3 align="center" style="font-size: 28px">تفضل هذا هو الرمز:</h3>
   <h1 align="center" class="secret-code" >${code}</h1>
   <h3 align="center" style="font-size: 28px">تحذير هذا الكود صالح فقط لمدة 5 دقائق من لحظة ارسال هذا الايميل</h3>

              
            </td>
        </tr>
    </table>



    <! Unsubscribe Footer -->

    <table role="presentation" bgcolor="#F5F8FA" width="100%" >
        <tr>
            <td align="left" style="padding: 30px 30px;">
                <p style="color:#99ACC2"> Chat App ❤️</p>
            </td>
        </tr>
    </table>
</div>
 
</body>
</html>
`