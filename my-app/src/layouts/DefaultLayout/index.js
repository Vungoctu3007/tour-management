import Header from "../Header";
import Component from "../Footer";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Component />
    </>
  );
}

export default DefaultLayout;
