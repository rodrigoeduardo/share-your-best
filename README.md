<div align="center">
  <h1>🎧 share your best!</h1>
</div>

<br />

share your best! is an application built by [me](https://github.com/rodrigoeduardo/) which aims to authenticate an user and get their most listened songs, artists and playlists from Spotify! Then, it'll be able to share good music taste on Instagram, Twitter, Facebook and other social networks!

## 🚀 Built With

- [Nextjs](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Spotify API](https://developer.spotify.com/documentation/web-api/)
- [Axios](https://github.com/axios/axios)

### Other dependencies

- [React Icons](https://react-icons.github.io/react-icons/)
- [vanilla-tilt.js](https://micku7zu.github.io/vanilla-tilt.js/index.html)

## 🛠 How to run

### Clone the project

**To run the application locally**, first you'll need to clone the repository:

```sh
git clone https://github.com/rodrigoeduardo/share-your-best.git
```

and then:

```sh
cd share-your-best
```

Now, you have to install project dependencies:

```sh
yarn install
```

and then, you can run it:

```sh
yarn dev
```

But before trying to log in with Spotify in the app, you must register your application in [Spotify for Developers](https://developer.spotify.com/dashboard/) dashboard.

### Register your app in Spotify

Access [Spotify for Developers](https://developer.spotify.com/dashboard/).

After logging in with your Spotify account, a "Create an app" button will be visible:

<img src="./public/images/spotify-dashboard.png" />

After clicking on it, create your app name and description and agree with Spotify's Developer Terms of Service and Branding Guidelines.
Then, click on "Edit settings" and add to Redirect URIs the following URI:
```
http://localhost:YOUR_PORT/api/auth/callback/spotify
```

If you want to an specific account to be able to log in, you have to add it on "Users and Access" page.

After that, go to your project and rename ```.env.example``` file to ```.env.local``` and fill the environmental variables with the keys in your [Spotify for Developers](https://developer.spotify.com/dashboard/) app dashboard.

**And that's it, you are ready to use!**

## 👨‍💻 Author

<div align="center">
  <img src="https://github.com/rodrigoeduardo.png" width="100" height="100" />

  <br />
  <b>Rodrigo Eduardo</b>
  <br />
  <br />

  <a href="mailto:rodrigoeduardodb1@gmail.com">
    <img alt="GitHub last commit" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
  </a>
  <a href="https://www.linkedin.com/in/rodrigoedb">
    <img alt="Perfil Linkedin" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
</div>
