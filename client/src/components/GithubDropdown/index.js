import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import "./GithubDropdown.css"

const GitHubDropdown = () => {
  return (
    <ButtonGroup>
      <Dropdown>
        <Dropdown.Toggle className="githubDropdown">
          Repos
          <img alt="github" src="./github-mark.svg" className="githubLogo"/>
        </Dropdown.Toggle>
        <Dropdown.Menu className="repoLinkMenu">
          <Dropdown.Item target="_blank" href="https://github.com/William-Gao1/skribbl-ai" className="repoLink">Skribbl.ai Web App</Dropdown.Item>
          <Dropdown.Item target="_blank" href="https://github.com/William-Gao1/skribbl-ai" className="repoLink">CNN Training</Dropdown.Item>
          <Dropdown.Item target="_blank" href="https://github.com/William-Gao1/skribbl-ai" className="repoLink">LSTM Training</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
    
  )
}

export default GitHubDropdown