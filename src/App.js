import React from 'react';
import './App.css';
import { Homepage } from './pages/homepage/homepage.component';
import { Route, Routes, Navigate } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-up/sign-in-and-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/user/user.actions';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth);
        (await userRef).onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route exact 
                path='/signin' 
                element={<SignInAndSignUpPage />} 
                render={()=> {console.log(this.props.currentUser); return (
                  this.props.currentUser ? 
                  (<Navigate to='/'/>): (<SignInAndSignUpPage/>)
                  )}}/>
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
