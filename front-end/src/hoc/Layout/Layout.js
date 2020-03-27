import React ,{Fragment, Component} from 'react';
import style from './Layout.module.css'

// HOC componet hust render adjacent components
class Layout extends Component {
    render (){
        return(
           <Fragment>
               <h2 style={{marginTop:'5px'}}>Welcome</h2>
              <main className={style.Content}>
              {this.props.children}
              </main>
           </Fragment>
        )
    }
}

export default Layout;