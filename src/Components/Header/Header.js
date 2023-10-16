import React, { useContext } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

function Header() {

  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext)
  const Navigate = useNavigate()

  function handleLogout() {
    let confirmLogout = window.confirm("Are you sure you want to logout?");   //test
    if (!confirmLogout) return
    const auth = firebase.firebaseAuth.getAuth();
    firebase.firebaseAuth.signOut(auth).then(() => {
      // Sign-out successful.
      alert('Successfully logged out');  //test
    }).catch((error) => {
      console.log(error.message);
      alert('Unable to Logout | ' + error.message);
    });
  }

  function sellButtonHandler() {
    if (user) Navigate('/create')
    else Navigate('/login')
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={() => Navigate('/')} className="brandName ps-3" style={{ cursor: 'pointer' }}>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input p-2">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>

        <div className="loginPage">
          {user ?
            <>
              <span className='fw-bold'>{`Welcome ${user.displayName}`}</span>
              <br />
              <h6 onClick={handleLogout} className='text-end'>Logout</h6>
            </>
            :
            <a href="/login"><span className='fw-bold'>Login</span></a>}
          <hr />
        </div>

        <div onClick={sellButtonHandler} className="sellMenu me-4">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span className='fw-bold'>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
