import React, { Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Message } from "semantic-ui-react";



const renderTextArea = field => (
  <Form.TextArea
    {...field.input}
    label={field.label}
    placeholder={field.placeholder}
  />
);


const ContactForm = (props) => {
  const { handleSubmit, reset, message = null} = props;


  return (
    <Fragment>
      {message &&
      <Message info>
        <p>{message}</p>
      </Message>
      }
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Field
            component={Form.Input}
            label="Name"
            name="name"
            placeholder="Name"
          />
          <Field
            component={Form.Input}
            label="Email"
            name="email"
            placeholder="Email"
          />

        </Form.Group>

        <Field
          component={renderTextArea}
          label="Message"
          name="message"
          placeholder=""
        />

        <Form.Group inline>
          <Form.Button primary>Submit</Form.Button>
          <Form.Button onClick={reset}>Clear</Form.Button>
        </Form.Group>
      </Form>
    </Fragment>
  );
};

export default reduxForm({
  form: "contact"
})(ContactForm);
