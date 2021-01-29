import withRoot from "./withRoot";
// --- Post bootstrap -----
import React from "react";
import AppAppBar from "./components/appAppBar";
import ProductHero from "./components/productHero";
import AppFooter from "./components/appFooter";

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
