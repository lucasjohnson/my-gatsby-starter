import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/Head/SEO';

interface TopicsProps {
	pageContext: {
		title: string;
		posts: string[];
	};
}

const Topics: React.FC<TopicsProps> = ({ pageContext }) => {
	const { title, posts } = pageContext;

	console.log(pageContext);

	return (
		<Layout>
			<SEO title={title} />
			<section className="Topics block">
				<h1 className="heading-1">{title}</h1>
			</section>
		</Layout>
	);
};

export default Topics;
