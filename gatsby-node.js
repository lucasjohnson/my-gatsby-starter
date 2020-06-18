const { fmImagesToRelative } = require(`gatsby-remark-relative-images`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ actions, graphql, reporter }) => {
	const { data: postsData } = await graphql(`
		query {
			allMarkdownRemark(filter: { fileAbsolutePath: { regex: "content/blog/" } }) {
				edges {
					node {
						fields {
							slug
						}
						frontmatter {
							title
							path
							topics
						}
					}
				}
			}
		}
	`);

	const { data: topicsData } = await graphql(`
		query {
			allMarkdownRemark(filter: { fileAbsolutePath: { regex: "content/topics/" } }) {
				edges {
					node {
						fields {
							slug
						}
						frontmatter {
							name
						}
					}
				}
			}
		}
	`);

	const { data: servicesData } = await graphql(`
		query {
			allMarkdownRemark(filter: { fileAbsolutePath: { regex: "content/services/" } }) {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
		}
	`);

	const posts = postsData.allMarkdownRemark.edges;
	const topics = topicsData.allMarkdownRemark.edges;
	const services = servicesData.allMarkdownRemark.edges;

	posts.forEach(({ node }, index) => {
		const { path } = node.frontmatter;

		actions.createPage({
			path: `/blog/${path}`,
			component: require.resolve(`./src/templates/post.tsx`),
			context: {
				pathSlug: `${path}`,
				prev: index === 0 ? null : posts[index - 1].node,
				next: index === posts.length - 1 ? null : posts[index + 1].node
			}
		});
	});

	topics.forEach(({ node }) => {
		const { slug } = node.fields;
		const { name: topic } = node.frontmatter;

		actions.createPage({
			path: slug,
			component: require.resolve(`./src/templates/topic.tsx`),
			context: {
				posts,
				topic
			}
		});
	});

	services.forEach(({ node }) => {
		const { slug } = node.fields;

		actions.createPage({
			path: slug,
			component: require.resolve(`./src/templates/service.tsx`)
		});
	});

	if (postsData.errors || servicesData.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;
	fmImagesToRelative(node);

	if (node.internal.type === `MarkdownRemark`) {
		const slug = createFilePath({ node, getNode });

		createNodeField({
			node,
			name: `slug`,
			value: slug
		});
	}
};
