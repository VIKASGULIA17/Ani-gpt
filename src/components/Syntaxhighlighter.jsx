import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { lightfair } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Syntaxhighlighter = ({codeString,language}) => {
  return (
    <SyntaxHighlighter language="text" style={lightfair}
    >

      {codeString}
    </SyntaxHighlighter>
  )
}

export default Syntaxhighlighter