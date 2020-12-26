import React from "react";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";

import "./style/common.scss";
import styles from "./App.module.scss";
import Banner from "./components/Banner/Banner";

function App() {
  return (
    <div>
      <Header />
      {/* <Banner /> */}
      <div className={styles.body}>
        <main>
          <SearchBox />
        </main>
        <aside>
          <h1>Nominations</h1>
          <div>Start nominating movies and they'll show up here!</div>
        </aside>
      </div>
    </div>
  );
}

export default App;
