import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/Head/SEO';

const ErrorPage: React.FC = () => (
	<Layout>
		<SEO title="Error Page" />
		<section className="Error block">
			<h1 className="heading-1">Error Page</h1>
		</section>
	</Layout>
);

export default ErrorPage;
