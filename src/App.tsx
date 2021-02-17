import './app.scss';
import CategoryList from './components/categories/CategoryList'
import Toolbar from './modules/toolbar/Toolbar';
import { Layout } from 'antd'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import UpsertCategory from './modules/category/UpsertCategory';
import CategoryView from './modules/category/CategoryView';
import React, { useEffect } from 'react';
import queryString from 'query-string'
import { selectCategory } from './store/Categories';
import { useDispatch } from 'react-redux';

const App = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  
  useEffect(() => {
    const queryCategoryName = queryString.parse(location.search).categoryName as string
    if (!!queryCategoryName) {
      dispatch(selectCategory(queryCategoryName))
    }
  }, [dispatch, location])


  return (
    <Layout className="app">
      <Toolbar />
      <div className="main">
        <Switch>
          <Route path="/categories">
            <CategoryList />
          </Route>
          <Route path='/upsert'>
            <UpsertCategory />
          </Route>
          <Route path='/view'>
            <CategoryView />
          </Route>
          <Route render={() => <Redirect to="/categories" />} />
        </Switch>
      </div>
    </Layout>
  )
}

export default App;
