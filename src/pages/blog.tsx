import React from 'react';
import Layout from '../components/Layout';
import GridBox from '../blocks/elements/GridBox';
import GridCard from '../blocks/elements/GridCard';
import SEO from '../components/SEO';
import { useStaticQuery, graphql } from 'gatsby';

interface BlogQuery {
	allMarkdownRemark: {
		edges: {
			node: {
				fields: {
					slug: string;
				};
				frontmatter: {
					abstract: string;
					date: string;
					title: string;
					banner: {
						childImageSharp: {
							fluid: {
								aspectRatio: number;
								base64: string;
								sizes: string;
								srcSet: string;
							};
						};
					};
				};
			};
		}[];
	};
}

const BlogPage = () => {
	const { allMarkdownRemark } = useStaticQuery<BlogQuery>(graphql`
		query {
			allMarkdownRemark {
				edges {
					node {
						fields {
							slug
						}
						frontmatter {
							abstract
							date
							featured
							title
							banner {
								childImageSharp {
									fluid {
										...GatsbyImageSharpFluid
									}
								}
							}
						}
					}
				}
			}
		}
	`);

	const { edges } = allMarkdownRemark;

	return (
		<Layout>
			<SEO title="Blog" />
			<section className="block">
				<div className="grid-flex">
					<div className="column-12">
						<h1 className="heading-1">Blog</h1>
						<GridBox variant="grid-box" column={1} columnMd={2} columnLg={3}>
							{edges.map((edge: object[], index: number) => {
								const { node } = edge;
								const { frontmatter } = node;
								frontmatter.slug = node.fields.slug;
								return <GridCard data={frontmatter} key={index} />;
							})}
						</GridBox>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default BlogPage;
