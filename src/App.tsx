import './app.scss';
import CategoryList from './components/categories/CategoryList'
import Toolbar from './modules/toolbar/Toolbar';
import { Layout } from 'antd'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import CategoryView from './modules/view/CategoryView';
import React, { useEffect } from 'react';
import queryString from 'query-string'
import { selectCategory } from './store/Categories';
import { useDispatch } from 'react-redux';
import Footbar from './modules/footbar/Footbar';
import { useTypedSelector } from './store';
import LocationList from './components/locations/LocationList';
import LocationView from './modules/view/LocationView';
import UpsertEntity from './modules/upsert/UpsertEntity';
import { selectLocation } from './store/Locations';

const App = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const currentContext = useTypedSelector(state => state.context.current)
  const currentState = useTypedSelector(state => state[currentContext])
  
  useEffect(() => {
    const entityName = queryString.parse(location.search).entityName as string
    const selectAction = currentContext === 'categories' ? selectCategory : selectLocation
    if (entityName && !currentState.selected) {
      dispatch(selectAction(entityName))
    }
  }, [dispatch, location, currentContext, currentState])

  return (
    <Layout className="app">
      <Toolbar />
      <div className="main">
        <Switch>
          <Route path="/categories">
            <CategoryList />
          </Route>
          <Route path="/locations">
            <LocationList />
          </Route>
          <Route path='/upsert'>
            <UpsertEntity />
          </Route>
          <Route path='/view'>
            {
              currentContext === 'categories' ? <CategoryView /> : <LocationView />
            }
          </Route>
          <Route render={() => <Redirect to={{pathname: `/${currentContext}`}} />} />
        </Switch>
      </div>
      <Footbar />
    </Layout>
  )
}

export default App;
