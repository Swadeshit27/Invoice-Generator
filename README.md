# Invoice Generator 
Invoice generator is full stack web application, to generate invoice from the given products details.

**Live link:**  https://invoice-generator-five-alpha.vercel.app

```
      https://invoice-generator-five-alpha.vercel.app
```
## Tech Tools

|  Sl. No       | Front-End                | Back-End                        |
|------------|----------------------------|-----------------------------|
| 1.  |  React Using Vite   | Node JS  |
| 2.     | TypeScript   | Express JS |
| 3.     | Tailwind CSS   | MongoDb Atlas |
| 4.     |  Formik & yup    | Typesctipt |
| 5.     | Flowbite React   | Bcrypt |
| 6.     | Axios   | Json Web Token |
| 7.     | Redux Toolkit   | pdfkit  |
| 8.     | Redux Persist   |  |

## Project Description

1. There are total 5 routes login, register, forget password, add products, generate invoices.
2. First user has to register with name, email and password (Note* email should be proper and Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character as proper validation is used. After successful registration the user has to redirect to login page. An unknown user can't visit, add products and generate invoice page as these are marked as private.
3. User login to their account with proper email and password. In case the user forgot their password, then users can create their password using their email details.
4. If successful login, the user has to redirect to the home page where user can add their products. In case the user enters any wrong product, then the user can remove this product. After confirming, all details are saved to database and redirect to generate pdf page where users can download an invoice.
5. For managing state I used redux toolkit and redux persist to achieve persistence.
6. For validate the input fields I used formic and yup.

**Note in the deployment link don't reload the page.
