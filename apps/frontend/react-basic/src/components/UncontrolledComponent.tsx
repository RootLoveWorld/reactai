import React, { useRef, useState } from 'react';

const UncontrolledComponent: React.FC = () => {
  // Refs to access DOM elements directly
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  
  // State only for displaying submitted data
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    message: string;
  } | null>(null);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Access values directly from DOM using refs
    const formData = {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
      message: messageRef.current?.value || ''
    };
    
    console.log('Uncontrolled Component Form Data:', formData);
    setSubmittedData(formData);
    alert(`Submitted Data:\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
  };

  // Clear form by directly manipulating DOM
  const clearForm = () => {
    if (nameRef.current) nameRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    if (messageRef.current) messageRef.current.value = '';
    setSubmittedData(null);
  };

  // Get current values from DOM (for demonstration)
  const getCurrentValues = () => {
    const currentData = {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
      message: messageRef.current?.value || ''
    };
    setSubmittedData(currentData);
  };

  return (
    <div className="component-section">
      <h2>🔗 Uncontrolled Component Example</h2>
      <p>
        <strong>特点：</strong> DOM 自己管理输入框的值。React 通过 refs 在需要时获取值。
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="uncontrolled-name">Name:</label>
          <input
            id="uncontrolled-name"
            type="text"
            ref={nameRef} // 使用 ref 而不是 value 和 onChange
            defaultValue="" // 使用 defaultValue 设置初始值
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="uncontrolled-email">Email:</label>
          <input
            id="uncontrolled-email"
            type="email"
            ref={emailRef} // 使用 ref 而不是 value 和 onChange
            defaultValue="" // 使用 defaultValue 设置初始值
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="uncontrolled-message">Message:</label>
          <textarea
            id="uncontrolled-message"
            ref={messageRef} // 使用 ref 而不是 value 和 onChange
            defaultValue="" // 使用 defaultValue 设置初始值
            placeholder="Enter your message"
            rows={4}
          />
        </div>

        <button type="submit" className="button">
          Submit Uncontrolled Form
        </button>
        <button type="button" className="button" onClick={clearForm}>
          Clear Form
        </button>
        <button type="button" className="button" onClick={getCurrentValues}>
          Get Current Values
        </button>
      </form>

      <div className="output">
        <strong>最后获取的值 (通过 Refs):</strong>
        <br />
        {submittedData ? (
          <>
            Name: {submittedData.name}
            <br />
            Email: {submittedData.email}
            <br />
            Message: {submittedData.message}
          </>
        ) : (
          '点击 "Get Current Values" 或 "Submit" 来查看当前值'
        )}
      </div>
    </div>
  );
};

export default UncontrolledComponent;