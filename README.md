# MVC Structure

This project is structured using the Model-View-Controller (MVC) architecture. MVC separates application components, making the code more readable, organized, and easier to maintain. This README file explains the structure, components, and usage of the project.

## Project Structure
```plaintext
/Controllers
/Models
  /Middlewares
  /Schemas
  /Services
/Views
  /Assets
    /Audios
    /Fonts
    /Icons
    /Images
    /Scripts
    /Styles
    /Videos
  /Pages
  /Templates
    /Components
    /Layouts
    /Partials
```

### 1. Controllers
Controllers are components that manage user requests and implement business logic. They process incoming HTTP requests, access the appropriate models, and call views to present results to the user. They typically include the following functions:
- Processing user requests
- Interacting with models
- Selecting and returning views

### 2. Models
Models represent the structure of the data and the business logic. They include the following subsections:

#### a. Middlewares
Middleware are code snippets that check the client request and perform specific tasks before processing. Example use cases include:
- Authentication and authorization
- Data validation
- Request logging

#### b. Schemas
Schemas define the structures of the database. They determine the structure of database tables and include data validation rules. An example user schema might look like this:

```javascript
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});
```

#### c. Services
Services are used to manage complex business logic and processes. They are useful for managing interactions between models or specific functionalities centrally. For example, they can be used for a user registration process or sending emails.

### 3. Views
Views are components that make up the user interface. They include the following subsections:

#### a. Assets
Assets contain the media files used in your application. They host the following subfolders:
- **Audios**: Audio files
- **Fonts**: Font files
- **Icons**: Icon files
- **Images**: Image files
- **Scripts**: JavaScript files
- **Styles**: CSS files
- **Videos**: Video files

#### b. Pages
Pages represent specific pages in your application. Each page contains the content presented to the user.

#### c. Templates
Templates provide reusable structures and layouts across pages. They include the following subsections:
- **Components**: Reusable components (e.g., buttons, forms)
- **Layouts**: Layouts that define the overall appearance of your application
- **Partials**: Code snippets shared between pages (e.g., header or footer)

## Scenario

In this project, user requests are handled at the Controllers layer. For example, when a user wants to create a new record through a form, this request is processed by a controller. The controller retrieves the necessary data from the appropriate schemas in the Models layer and calls methods in the Services layer to perform database operations. CRUD operations and other business logic tasks are carried out within these Services.

While database operations are performed, the necessary authentication and authorization processes are checked by the code snippets in the Middleware layer. If the user is authorized, the controller retrieves the required data and sends the appropriate files located in the `Pages` directory of the Views layer as a response.

The files in the `Pages` directory consist of `Partials` located within Templates. These `Partials` are used within specific layouts to create the page structure. For example, a `header` partial is present at the top of each page, while a `footer` partial appears at the bottom. The page design is enriched by using reusable `Components` within these `Partials`.

## Installation

1. **Requirements**
   - Node.js
   - MongoDB (or another database)

2. **Download Project Files**
   ```bash
   git clone <repo-url>
   cd <repo-name>
   ```

3. **Install Required Packages**
   ```bash
   npm install
   ```

4. **Configure Database Connection**
   - Set the necessary database connection settings in the `.env` file.

5. **Start the Application**
   ```bash
   npm start
   ```

## Usage

- You can send requests using your application's API endpoints and receive responses.
- You can perform operations through the user interface.

## Contributors

Contributors to this project:
- [Ali Ravza Barlak](https://barlak.com.tr)

## License

This project is licensed under the MIT License. For more information, see the LICENSE file.#
