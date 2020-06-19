import React, { FunctionComponent } from 'react';
import Layout from '../components/Layout';
import GridBox from '../templates/elements/GridBox';
import GridCard from '../templates/elements/GridCard';
import SEO from '../components/Head/SEO';
import { useStaticQuery, graphql } from 'gatsby';

interface BlogQuery {
	allFile: {
		edges: {
			node: {
				childMarkdownRemark: {
					frontmatter: {
						abstract: string;
						date: string;
						path: string;
						title: string;
						topics?: string[];
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
			};
		};
	};
}

const BlogPage: FunctionComponent = () => {
	const { allFile } = useStaticQuery<BlogQuery>(graphql`
		query {
			allFile(filter: { relativeDirectory: { regex: "/(blog)/" } }) {
				edges {
					node {
						childMarkdownRemark {
							frontmatter {
								abstract
								date
								path
								title
								topics
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
		}
	`);

	const { edges } = allFile;

	const renderCard = (): FunctionComponent =>
		edges.map((edge: object, index: number) => {
			const { node } = edge;
			const { childMarkdownRemark } = node;
			const { frontmatter } = childMarkdownRemark;

			return <GridCard data={frontmatter} key={index} />;
		});

	return (
		<Layout>
			<SEO title="Blog" />
			<section className="Blog">
				<div className="block">
					<div className="grid-flex">
						<div className="column-12">
							<h1 className="heading-1">Blog</h1>
							<GridBox variant="grid-box" column={1} columnMd={2} columnLg={3}>
								{renderCard()}
							</GridBox>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default BlogPage;
