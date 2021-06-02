import React from 'react';
import { BrowserRouter, Route, NavLink, Router, Switch }
from 'react-router-dom';
import './App.css';


// class Info extends React.Component{
//   render() {
//     const city = this.props.match.params.city;
//     const country = this.props.match.params.country;
//     const year = this.props.match.params.year;
//     return <div><h1>{city} - {country}</h1>
//     <p>{year}</p>
//     </div>;
//   }
// }
// class Option extends React.Component{
//   render() {
//     const name = "Цветочные часы";
//     const path = "img.jpg";
//     return <div><h1>{name}</h1>
//     <img src={process.env.PUBLIC_URL + path } /></div>;
//   }
// }
// class Options extends React.Component {
//   render() {
//     const images = ["img1.jpg", "img2.jpg"];
//     return <div> {
//       images.map(function(image) {
//         return <img src={process.env.PUBLIC_URL + image } />
//      })}</div>;
//   }
// }
// class Images extends React.Component {
//   render() {
//     const imagesSights = ["img3.jpg", "img4.jpg"];
//     return <div> {
//       imagesSights.map(function(image) {
//         return <img src={process.env.PUBLIC_URL + image } />
//      })}</div>;
//   }
// }
// class NotFound extends React.Component {
//   render() {
//     return <h1>Ресурс не найден</h1>;
//   }
// }
// class Nav extends React.Component {
//   render() {
//     const city = "Кривой Рог";
//     const country = "Украина";
//     const year = 1775;
//     return <nav>
//               <NavLink className="Nav_link" to="/">Известная достопримечательность</NavLink>
//               <NavLink className="Nav_link" to={`/info/${city}/${country}/${year}`}>О городе</NavLink>
//               <NavLink className="Nav_link" to="/options">Другие достопримечательности</NavLink>
//               <NavLink className="Nav_link" to="/images">Фото</NavLink>
//             </nav>;
//   }
// }
// export default class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <BrowserRouter>
//           <div>
//             <Nav />
//             <Switch>
//               <Route exact path="/" component={Option} />
//               <Route path="/info/:city/:country/:year" component={Info} />
//               <Route path="/options" component={Options} />
//               <Route path="/images" component={Images} />
//               <Route component={NotFound} />
//             </Switch>
//           </div>
//         </BrowserRouter>
//       </div>
//     );
//   }
// }



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
    var name;
    var nameIsValid = this.validateName(name);
    var password;
    var passwordIsValid = this.validatePassword(password);
    var email;
    this.state = {name: name, password: password, email: email,
      nameValid: nameIsValid, passwordValid: passwordIsValid};
    this.onNameChange = this.onNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateName(name) {
    if (name != null)
      return name.length>2;
  }
  validatePassword(password) {
    if (password != null)
      return password.length>2;
  }
  onNameChange(e) {
    var val = e.target.value;
    var valid = this.validateName(val);
    this.setState({name: val, nameValid: valid});
  }
  onPasswordChange(e) {
    var val = e.target.value;
    var valid = this.validatePassword(val);
    this.setState({password: val, passwordValid: valid});
  }
  onEmailChange(e) {
    var val = e.target.value;
    this.setState({email: val});
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.nameValid ===true && this.state.passwordValid===true) {
      alert("Имя: " + this.state.name + " Пароль: " +
        this.state.password + " Email: " + this.state.email +
        " Фото: " + this.state.imagePreviewUrl);
    }
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file);
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="App">
         <div className="imgPreview">
          {imagePreview}
        </div>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label>Имя:</label><br />
            <input type="text" value={this.state.name}
            onChange={this.onNameChange}/>
          </p>
          <p>
            <label>Пароль:</label><br />
            <input type="password" value={this.state.password}
            onChange={this.onPasswordChange}/>
          </p>
          <p>
            <label>Email:</label><br />
            <input type="text" value={this.state.email}
            onChange={this.onEmailChange}/>
          </p>
          <input className="fileInput" type="file" 
          onChange={this.handleImageChange} />
          <input type="submit" value="Сохранить" />
        </form>
       
      </div>
    )
  }
}