import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ConfigProvider, App as AntdApp } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ThemedLayoutV2, ThemedTitleV2 } from '@refinedev/antd';
import { Refine, Authenticated } from '@refinedev/core';
import routerProvider, { NavigateToResource } from '@refinedev/react-router-v6';
import { liveProvider } from '@refinedev/supabase';
import { supabaseClient } from './providers/supabaseClient';
import { dataProvider } from '@refinedev/supabase';
import authProvider from './providers/auth-provider';
import { ShowEmployee } from './pages/employees/show';
import { ListEmployee } from './pages/employees/list';
import { Login } from './pages/login';
import 'antd/dist/reset.css';
import EventCalendar from './pages/Events/calender'; 

export default function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            liveProvider={liveProvider}
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerProvider}
            resources={[
              {
                name: 'employees',
                list: '/employees',
                show: '/employees/:id',
                meta: { label: 'Сотрудники' },
              },
              {
                name: 'calendar',
                list: '/calendar',
                meta: { label: 'Календарь' },
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    redirectOnFail="/login"
                  >
                    <ThemedLayoutV2
                      Title={(props) => (
                        <ThemedTitleV2
                          {...props}
                          text="Giper.fm"
                          icon={<UserOutlined />}
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="employees" />}
                />
                <Route path="/employees">
                  <Route index element={<ListEmployee />} />
                  <Route path=":id" element={<ShowEmployee />} />
                </Route>
                <Route path="/calendar">
                  <Route index element={<EventCalendar />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="employees" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}





