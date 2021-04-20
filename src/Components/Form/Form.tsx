interface IProps {
  submitFn: any;
  className?: string;
}

const Form: React.FC<IProps> = ({ submitFn, className, children }) => (
  <form
    className={className}
    onSubmit={(event) => {
      event.preventDefault();
      submitFn();
    }}
  >
    {children}
  </form>
);

export default Form;
