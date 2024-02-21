import React from 'react';
import logo from './logo.svg';
import './App.css';
import data from "./data.json"


function ContactInfo({ contact_info }: {contact_info: Array<string>}) {
  function format_info(info: string) {
    if (info.includes("://")) {
      return <a href={info}>{info.split("://")[1]}</a>
    }
    return <span>{info}</span>
  }
  return (
    <div id="contact">
      {contact_info.map((info, i) => format_info(info))}
    </div>
  );
}

type Skill = {
  category: string, skills: Array<string>
}
function Skills({skill_groups}: {skill_groups: Array<Skill>}) {
  return (
    <div id="skills">
      <div className="title">Skills</div>
      {skill_groups.map((group, g) =>
        <div className="skill-group">
          <div className="sub title">{group.category}</div>
          <div className="skill-list">
            {group.skills.map((skill, s) => <span>{skill}</span>)}
          </div>
        </div>
      )}
    </div>
  )
}

type Position = {
  name: string, location?: string, dates?: string, responsibilities: Array<string>
}

type Employer = {
  name: string, location: string, dates: string, positions: Array<Position>
}

function Employment({employers}: {employers: Array<Employer>}) {
  return (
    <div id="employment">
      <div className="main title">Professional Experience</div>
      {employers.map((employer, e) =>
        <div className="employer">
          <div className="title">
            <span>{employer.name}</span>
            <span>{employer.location}</span>
            <span>{employer.dates}</span>
          </div>
          <div className="positions">
          {employer.positions.map((position, p) =>
            <div className="position">
              <div className="sub title">
                <span>{position.name}</span>
                <span>{position.location}</span>
                <span>{position.dates}</span>
              </div>
              <ul>
                {position.responsibilities.map((line, l) => <li>{line}</li>)}
              </ul>
            </div>
          )}
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <div id="content">
      <div id="title">
        <h1>Chase Caster</h1>
        <h2>Senior Software Engineer</h2>
        <p id="blurb">
        {data.blurb.map((line, b) => <span>{line}</span>)}
        </p>
      </div>
      <ContactInfo contact_info={data.contact} />
      <div id="columns">
        <div className="column">
          <Skills skill_groups={data.skills}/>
        </div>
        <div className="column"></div>
          <Employment employers={data.employers}/>
      </div>
    </div>
  );
}

export default App;
