import React from 'react';
import {Field} from 'redux-form'

const Index = ({
                   errors,
                   containerProps = {},
                   inputProps = {},
                   name,
                   type = "text",
                   placeholder,
                   children,
                   prefixChildren = null,
                   value
               }) => (
    <div {...containerProps}>
        {prefixChildren}
        <Field {...{
            type     : 'text',
            component: 'input'
        }
               }
               name={name}
               type={type}
               placeholder={placeholder}
               {...inputProps}
               value={value}
        />
        {children}
        <div className="error-container">{errors || []}</div>
    </div>);

export default Index;
