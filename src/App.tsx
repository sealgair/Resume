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
            {group.skills.map((skill, s) =>
              <Selectable key={s} relates={skill}>{skill}</Selectable>
            )}
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

type Fact = {
  description: string, skills?: Array<string>
}

type Project = {
  name: string, url: string, facts: Array<Fact>
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
            {project.facts.map((fact, f) =>
              <Selectable key={f} related={fact.skills}>{fact.description}</Selectable>
            )}
          </ul>
        </Selectable>
      )}
    </div>
  )
}

type Responsibility = {
  description: string, skills: Array<string>
}

type Position = {
  name: string, location?: string, dates?: string, responsibilities: Array<Responsibility>
}

type Employer = {
  name: string, location: string, dates: string, positions: Array<Position>
}

function EmployerDetails({employer}: {employer: Employer}) {
  return (
      <Selectable className="employer section nobreak select-container">
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
              {position.responsibilities.map((responsibility, r) =>
                <li key={r}>
                  <Selectable related={responsibility.skills}>{responsibility.description}</Selectable>
                </li>
              )}
            </ul>
          </Selectable>
        )}
        </div>
      </Selectable>
  )
}

type EmploymentProps = {
  employers: Array<Employer>,
  summarize: boolean
}

function Employment({employers, summarize}: EmploymentProps) {
  const current = employers[0]
  const past = employers.slice(1)
  let pastDetails
  if (summarize) {
    pastDetails = (<>
      <div className="title">Previous Employers</div>
      {past.map((employer, e) =>
         <Selectable key={e}>
          <div className="sub title">
            <span>{employer.name}</span>
            <span>{employer.location}</span>
            <span>{employer.dates}</span>
          </div>
          <ul>
            {employer.positions.map((position, p) => <li>{position.name}</li>)}
          </ul>
         </Selectable>
      )}
    </>)
  } else {
    pastDetails = past.map((employer, e) =>
      <EmployerDetails key={e} employer={employer}/>
    )
  }
  return (
    <div id="employment select-container">
      <div className="main title">Professional Experience</div>
        <EmployerDetails employer={current}/>
        {pastDetails}
    </div>
  )
}

class App extends React.Component {
  state: {
    showContact: boolean,
    summarize: boolean
  }

  constructor(props: {}) {
    super(props)
    this.state = {
      showContact: false,
      summarize: false
    }
    this.changeShowContact = this.changeShowContact.bind(this)
    this.changeSummarize = this.changeSummarize.bind(this)
  }

  changeShowContact() {
    this.setState({showContact: !this.state.showContact})
  }
  changeSummarize() {
    this.setState({summarize: !this.state.summarize})
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
              <Employment employers={data.employers} summarize={this.state.summarize}/>
          </div>
        </div>
        <ControlBar showContact={this.state.showContact}
              changeShowContact={this.changeShowContact}
                      summarize={this.state.summarize}
                changeSummarize={this.changeSummarize}
        />
      </>)
  }
}

export default App
