import Ember from 'ember';

const {
  copy,
  isArray
} = Ember;

export function serialize(type, data) {
  let payload = { data: [] };

  if (!isArray(data)) {
    payload.data = serializeAttributes(type, data);
  } else {
    payload.data = data.map(function(attributes) {
      return serializeAttributes(type, attributes);
    });
  }

  return payload;
}

function serializeAttributes(type, data) {
  let attributes = copy(data);
  let { id } = attributes;
  delete attributes.id;

  return {
    type,
    id,
    attributes
  };
}
