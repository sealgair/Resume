import React from 'react'
import logo from './logo.svg'
import './App.css'
import Selectable from './Selectable'
import ControlBar from './ControlBar'
import data from "./data.json"


function Url({link}: {link: string}) {
  if (link.includes("://")) {
    return <a href={link}>{link.split("://")[1]}</a>
  }
  return <span>{link}</span>
}

function ContactInfo({ contactInfo }: {contactInfo: Array<string>}) {
  return (
    <div id="contact">
      {contactInfo.map((info, i) => <Url link={info}/>)}
    </div>
  )
}

type Skill = {
  category: string, skills: Array<string>
}
function Skills({skillGroups}: {skillGroups: Array<Skill>}) {
  return (
    <div id="skills">
      <div className="title">Skills</div>
      {skillGroups.map((group, g) =>
        <div key={g} className="skill-group">
          <div className="sub title">{group.category}</div>
          <div className="skill-list">
            {group.skills.map((skill, s) => <span key={s}>{skill}</span>)}
          </div>
        </div>
      )}
    </div>
  )
}

type Education = {
    name: string, location: string, degree: string, dates: string,
}

function EducationInfo({education}: {education: Education}) {
  return (
    <div id="education" className="section nobreak">
      <div className="title">Education</div>
      <div className="sub title">{education.name}</div>
      <div className="info">
        <span>{education.location}</span>
        <span>{education.dates}</span>
      </div>
      <div>{education.degree}</div>
    </div>
  )
}

type Project = {
  name: string, url: string, description: Array<string>
}

function PersonalProjects({projects}: {projects: Array<Project>}) {
  return (
    <div id="personal" className="section">
      <div className="title">Personal Projects</div>
      {projects.map((project, p) =>
        <Selectable key={p} className="project nobreak select-container">
          <div className="sub title">{project.name}</div>
          <div><Url link={project.url}/></div>
          <ul>
            {project.description.map((line, l) => <Selectable key={l}>{line}</Selectable>)}
          </ul>
        </Selectable>
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

type EmploymentProps = {
  employers: Array<Employer>,
}

function Employment({employers}: EmploymentProps) {
  return (
    <div id="employment select-container">
      <div className="main title">Professional Experience</div>
      {employers.map((employer, e) =>
        <Selectable key={e} className="employer section nobreak select-container">
          <div className="title">
            <span>{employer.name}</span>
            <span>{employer.location}</span>
            <span>{employer.dates}</span>
          </div>
          <div className="positions">
          {employer.positions.map((position, p) =>
            <Selectable key={p} className="position select-container">
              <div className="sub title">
                <span>{position.name}</span>
                <span>{position.location}</span>
                <span>{position.dates}</span>
              </div>
              <ul>
                {position.responsibilities.map((line, l) =>
                  <li key={l}>
                    <Selectable>{line}</Selectable>
                  </li>
                )}
              </ul>
            </Selectable>
          )}
          </div>
        </Selectable>
      )}
    </div>
  )
}

class App extends React.Component {
  state: {
    showContact: boolean,
  }

  constructor(props: {}) {
    super(props)
    this.state = {
      showContact: false,
    }
    this.changeShowContact = this.changeShowContact.bind(this)
  }

  changeShowContact() {
    this.setState({showContact: !this.state.showContact})
  }

  render() {
      return (<>
        <div id="content">
          <div id="title">
            <h1>Chase Caster</h1>
            <h2>Senior Software Engineer</h2>
            <p id="blurb">
            {data.blurb.map((line, b) => <span key={b}>{line}</span>)}
            </p>
          </div>
          {this.state.showContact ?
            <ContactInfo contactInfo={data.contact} /> : ""
          }
          <div id="columns">
            <div className="column">
              <Skills skillGroups={data.skills}/>
              <PersonalProjects projects={data.personal}/>
              <EducationInfo education={data.education}/>
            </div>
            <div className="column"></div>
              <Employment employers={data.employers}/>
          </div>
        </div>
        <ControlBar showContact={this.state.showContact}
              changeShowContact={this.changeShowContact}/>
      </>)
  }
}

export default App
