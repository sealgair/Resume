import React from 'react'
import logo from './logo.svg'
import './App.css'
import data from "./data.json"
import { useState } from "react"


function format_url(info: string) {
  if (info.includes("://")) {
    return <a href={info}>{info.split("://")[1]}</a>
  }
  return <span>{info}</span>
}

function ContactInfo({ contact_info }: {contact_info: Array<string>}) {
  return (
    <div id="contact">
      {contact_info.map((info, i) => format_url(info))}
    </div>
  )
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
        <div className="project nobreak">
          <div className="sub title">{project.name}</div>
          <div>{format_url(project.url)}</div>
          <ul>
            {project.description.map((line, l) => <li>{line}</li>)}
          </ul>
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
        <div className="employer section nobreak">
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

type ControlProps = {
  showContact: boolean, changeShowContact: () => void
}

function ControlBar({showContact, changeShowContact}: ControlProps) {
  return (
    <div id="controls">
      <label id="show-contact">
      Contact Info
      <input type="checkbox" checked={showContact} onChange={changeShowContact}/>
      </label>
    </div>
  )
}

class App extends React.Component {
  state: {showContact: boolean}

  constructor(props: {}) {
    super(props)
    this.state = {
      showContact: false
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
            {data.blurb.map((line, b) => <span>{line}</span>)}
            </p>
          </div>
          {this.state.showContact ?
            <ContactInfo contact_info={data.contact} /> : ""
          }
          <div id="columns">
            <div className="column">
              <Skills skill_groups={data.skills}/>
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
