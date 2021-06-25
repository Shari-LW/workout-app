import withRoot from "./withRoot";
// --- Post bootstrap -----
import React from "react";
import AppAppBar from "./components/AppAppBar";
import ProductHero from "./components/ProductHero";
import AppFooter from "./components/AppFooter";

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
