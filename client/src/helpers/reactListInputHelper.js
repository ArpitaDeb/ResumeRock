import InputGroup from 'react-bootstrap/InputGroup';
import React from "react";
import Button from 'react-bootstrap/Button';
import drag from '../img/drag.svg';
import Form from 'react-bootstrap/Form';

export function Item({ decorateHandle, removable, onChange, onRemove, value }) {
  return (
    <div>
      <InputGroup className="mb-3">
        {decorateHandle(
          <div>
            <InputGroup.Prepend>
              <Button variant="outline-secondary">
                <img
                  alt=""
                  src={drag}
                  width="18"
                  height="18"
                />{' '}

              </Button>
            </InputGroup.Prepend>
          </div>
        )}
        <Form.Control
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
        />
        <InputGroup.Append>
          <Button variant="outline-danger" onClick={onRemove}>Remove</Button>
        </InputGroup.Append>
      </InputGroup>

    </div>
  )
}

export function StagingItem({ value, onAdd, canAdd, add, onChange }) {
  return (
    <div>

      <InputGroup className="mb-3">
        <Form.Control
          // placeholder="Recipient's username"
          // aria-label="Recipient's username"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
        />
        <InputGroup.Append>
          <Button variant="outline-primary" onClick={canAdd ? onAdd : undefined}>Add</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  )
}