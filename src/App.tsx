import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import MainPage from "./components/Projects/MainPage";
import OrdersPage from "./components/OrdersPage/OrdersPage";
import OrderDetailPage from "./components/OrderDetailPage/OrderDetailPage";
import { Layout, Typography, Button, Drawer, Menu } from "antd";
import {
  MenuOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import AnimationLayer from "./components/AnimationLayer/AnimationLayer";
import Home from "./components/Home/Home";

const { Header, Content } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const getHeaderTitle = () => {
    switch (location.pathname) {
      case "/orders":
        return "Мои заказы";
      case "/":
        return "Главная";
      default:
        if (location.pathname.startsWith("/orders/")) {
          return "Детали заказа";
        }
        return "CyberClub";
    }
  };

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Главная",
    },
    {
      key: "/orders",
      icon: <ShoppingCartOutlined />,
      label: "Мои заказы",
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
    setDrawerVisible(false);
  };

  return (
    <>
      <Header
        style={{
          background: "#000",
          padding: "0 16px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          position: "sticky",
          top: 0,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <Title level={4} style={{ margin: 0 }}>
          {getHeaderTitle()}
        </Title> */}
        <img src="/logo.svg" alt="logo" width="140" />

        <Button
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
        />
      </Header>

      <Drawer
        title="Меню"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Drawer>
    </>
  );
};

const App = () => {
  const [animationIn, setAnimationIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setAnimationIn(true);
    setTimeout(() => setAnimationIn(false), 1000);
  }, [location]);

  return (
    <Layout style={{ background: "white", height: "100%" }}>
      <AppHeader />
      <Content style={{ display: "flex" }}>
        <AnimationLayer inProp={animationIn} />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/book" index element={<MainPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
        </Routes>
      </Content>
    </Layout>
  );
};

const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
