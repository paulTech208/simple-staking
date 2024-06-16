const Container = ({ containerClassName = "", children, contentClassName = "" }) => (
  <div className={`relative w-full ${containerClassName}`}>
    <div
      className={`w-[300px] 3md:w-[900px] md:w-[1020px] xl:w-[1200px] m-auto ${contentClassName}`}
    >
      {children}
    </div>
  </div>
)

export default Container
