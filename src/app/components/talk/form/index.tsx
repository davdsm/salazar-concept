const inputs = [
  {
    id: "firstName",
    name: "firstName",
    placeholder: "First name*",
    type: "text",
    required: true,
  },
  {
    id: "lastName",
    name: "lastName",
    placeholder: "Last name*",
    type: "text",
    required: true,
  },
  {
    id: "email",
    name: "email",
    placeholder: "Email address*",
    type: "email",
    required: true,
  },
  {
    id: "interested",
    name: "interested",
    placeholder: "Iam interested in?*",
    type: "text",
    required: true,
  },
];

export default function Form({
  handleSubmit,
  message,
}: {
  handleSubmit: (event: any) => void;
  message: string;
}) {
  return (
    <form onSubmit={handleSubmit}>
      {inputs.map(({ id, ...rest }) => (
        <input
          key={id}
          id={id}
          {...rest}
          className="mb-12 font-medium block w-full border-transparent focus:border-transparent focus:outline-none focus:ring-0 placeholder:text-zinc-500 placeholder:font-medium"
        />
      ))}

      <textarea
        name="message"
        id="message"
        rows={2}
        className="mb-12 font-medium block w-full border-transparent focus:border-transparent focus:outline-none focus:ring-0 placeholder:text-zinc-500 placeholder:font-medium"
        placeholder="Leave a message here*"
        required
      />

      <button type="submit" className="uppercase font-bold">
        Send
      </button>

      {message && <h3 className="mt-6 font-bold uppercase">{message}</h3>}
    </form>
  );
}
