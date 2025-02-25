import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppRoutes } from "./Routes";
import NavigationPanel from "../feauters/NavigationPanel";
import { Layout } from "antd";

function AppRouter() {
  return (
    <Router>
      <Main/>
    </Router>
    
  );
}

function Main() {
    return (
        <div>
            <Layout style={{marginBottom: 160, backgroundColor: '#0C0C0C'}}>
                <Routes>
                    {AppRoutes.map(route => 
                        <Route key={route.id} path={route.path} element={route.element}/>
                    )}
                </Routes>
            </Layout>
            <NavigationPanel/>
      </div>
    );
  }

export default AppRouter;