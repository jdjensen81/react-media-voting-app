# React Media Voting App

This is a React-based web application that allows users to view and vote on various media items, such as audio and video content. The application has two main views: an Admin Panel and a Voting Panel. This project was bootstrapped with Vite.

## Features

1. **Admin Panel**:
   - Administrators can view a list of all media items, including their thumbnails, URLs, and associated tags.
   - Administrators can add new tags to individual media items.

2. **Voting Panel**:
   - Users can view a list of all media items, including their thumbnails, URLs, associated tags, and the number of votes.
   - Users can vote for their favorite media items.

3. **User Authentication**:
   - The application supports two types of users: administrators and regular voters.
   - Administrators can access the Admin Panel, while regular users can only access the Voting Panel.
   - Users can switch between the admin and voter views using a toggle button.

## How to Use

1. Clone the repository:

   ```bash
   git clone https://github.com/jdjensen81/react-media-voting-app.git
   ```

2. Navigate to the project directory and install the dependencies:

   ```bash
   cd react-media-voting-app
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

4. Use the toggle button at the top of the page to switch between the Admin and Voting panels.

   - As an administrator, you can add new tags to media items.
   - As a regular user, you can view the media items and vote for your favorites.

## Technologies Used

- React
- React Router
- TypeScript
- Standard CSS (no external CSS frameworks)
- Vite

## Future Improvements

- Implement a backend API to store and retrieve media items and user data.
- Implement voting logic
- Allow voters to upvote and downvote, rate various aspects, and comment
- Add the ability for administrators to upload new media items.
- Implement user authentication and authorization using a real-world solution.
- Add .mp4 and .mp3 playback
- Add pagination or infinite scrolling for the media item lists.
- Enhance the visual design and user experience.

## Contributing

If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request. Contributions are always welcome!

## License

This project is licensed under the [MIT License](LICENSE).

## AI Generated Code Log

Since I used Anthropic's Claude 3 Haiku model to generate most of this code and documentation, I thought it would be helpful to include a log of the prompts and outputs. See [ClaudeLog.md](https://github.com/jdjensen81/react-media-voting-app/blob/main/ClaudeLog.md).
