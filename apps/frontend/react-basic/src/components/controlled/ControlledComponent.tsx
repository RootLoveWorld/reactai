import React from 'react';

const ControlledComponent: React.FC = () => {
  // State to manage form data
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Controlled Component Form Data:', formData);
    alert(`Submitted Data:\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
  };

  // Clear form
  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="component-section">
      <h2>🎛️ Controlled Component Example</h2>
      <p>
        <strong>特点：</strong> React 组件的状态控制输入框的值。每次输入都会触发状态更新。
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="controlled-name">Name:</label>
          <input
            id="controlled-name"
            type="text"
            name="name"
            value={formData.name} // 值由 React state 控制
            onChange={handleInputChange} // 每次输入都更新 state
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="controlled-email">Email:</label>
          <input
            id="controlled-email"
            type="email"
            name="email"
            value={formData.email} // 值由 React state 控制
            onChange={handleInputChange} // 每次输入都更新 state
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="controlled-message">Message:</label>
          <textarea
            id="controlled-message"
            name="message"
            value={formData.message} // 值由 React state 控制
            onChange={handleInputChange} // 每次输入都更新 state
            placeholder="Enter your message"
            rows={4}
          />
        </div>

        <button type="submit" className="button">
          Submit Controlled Form
        </button>
        <button type="button" className="button" onClick={clearForm}>
          Clear Form
        </button>
      </form>

      <div className="output">
        <strong>实时预览 (React State):</strong>
        <br />
        Name: {formData.name}
        <br />
        Email: {formData.email}
        <br />
        Message: {formData.message}
      </div>
    </div>
  );
};

export default ControlledComponent;