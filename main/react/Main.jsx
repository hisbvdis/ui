const Main = ({children, className}) => {
  return (<>
    <main className={`main  ${className}`}>
      <Container>
        {children}
      </Container>
    </main>
  </>)
}

export default Main;