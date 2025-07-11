'use client';

import CommentForm from '../../components/CommentForm';

export default function CommentFormWrapper({ blogId, slug }) {
  return <CommentForm blogId={blogId} slug={slug} />;
}
