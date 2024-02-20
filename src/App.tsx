import React from 'react';
import logo from './logo.svg';
import './App.css';
import data from "./data.json"


function ContactInfo({ contact_info }: {contact_info: Array<string>}) {
  return (
    <div id="contact">
      {contact_info.map((info, i) => <span>{info}</span>)}
    </div>
  );
}

function App() {
  return (
    <div id="content">
      <div id="title">
        <h1>Chase Caster</h1>
        <h2>Senior Software Engineer</h2>
        <h4>engineering reliable, resilient systems</h4>
        <h4>and writing maintainable, test-driven code</h4>
      </div>
      <ContactInfo contact_info={data.contact} />
      <div id="columns">
        <div className="column"></div>
        <div className="column"></div>
      </div>
    </div>
  );
}

export default App;
