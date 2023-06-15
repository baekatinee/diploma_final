import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

const BreadСrumbs = ({ links }) => {
  return (
    <Breadcrumb>
      {links.map((link, index) => (
        <Breadcrumb.Item key={index} href={link.url}>
          {link.text}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadСrumbs;