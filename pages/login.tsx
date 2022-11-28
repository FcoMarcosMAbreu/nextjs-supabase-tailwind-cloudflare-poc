import { Button, Input } from "components/ui";
import { supabase } from "lib/supabase";
import React, { useState } from "react";

const Login = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
    };
    const email = target.email.value;
    const { error } = await supabase.auth.signIn(
      { email },
      { redirectTo: "http://localhost:3000/login" }
    );

    if (!error) setSent(true);
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto flex flex-col text-center"
      >
        <h2 className="text-3xl font-semibold mb-6">Login</h2>
        <Input
          type="email"
          name="email"
          required
          placeholder="Email address"
          className="mb-4"
        />
        <Button disabled={sent} type="submit">
          <span>{sent ? "Sent! Check your email" : "Send magic link"}</span>
        </Button>
      </form>
    </div>
  );
};

export default Login;