import React, { Component } from 'react';
import Menu from './MenuCompnent';
import {connect} from 'react-redux'
import Header from './Header';
import Footer from './Footer';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import Home from './Home';
import Contact from './ContactComponent'
import DishDetails from './Dishdetails';
import About from './About';
import {fetchDishes, fetchComments, fetchPromos,postComment, fetchLeaders,postFeedback} from '../redux/ActionCreators'
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state =>{
  return {
    dishes:state.dishes,
    leaders:state.leaders,
    comments:state.comments,
    promotions:state.promotions
  }

}
const mapDispatchToProps = dispatch => ({
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchLeaders: () => {dispatch(fetchLeaders())},
  postFeedback: (firstname,lastname,telnum, email) => dispatch(postFeedback(firstname,lastname,telnum, email))
});

class Main extends Component{

  constructor(props){
    super(props);

  
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
render() {

  const HomePage = () => {
    return(
      <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leaderLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}
          />);
  }

  const DishWithId = ({match}) => {
    return(
      <DishDetails dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            addComment={this.props.addComment}
            postComment={this.props.postComment} 
          />
    );
  };
  

  const AboutLeaders = () =>{
   return  (<About
    leaders={this.props.leaders}
    leaderLoading={this.props.leaders.isLoading}
    leaderErrMess={this.props.leaders.errMess}
    ></About>);
  }
  return (
    <div className="App">
     <Header></Header>
     <TransitionGroup>
     <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
       <Switch location={this.props.location}>
           <Route path='/home' component={HomePage} />
           <Route exact path='/aboutus' component={AboutLeaders} />
           <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
           <Route path='/menu/:dishId' component={DishWithId} />
           <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
           <Redirect to="/home" />
       </Switch>
     </CSSTransition>
   </TransitionGroup>
      <Footer></Footer>
    </div>
  );
}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));

