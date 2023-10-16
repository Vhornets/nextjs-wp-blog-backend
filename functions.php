<?php
add_action('after_setup_theme', 'vh_theme_support');
function vh_theme_support()
{
    add_theme_support('wp-block-styles');

    add_editor_style('style.css');
}

add_action('admin_enqueue_scripts', 'vh_admin_theme_assets');
function vh_admin_theme_assets()
{
    global $pagenow;
    if (($pagenow == 'post.php') || 'post-new.php') {
        wp_enqueue_style('vh-styles', 'http://localhost:3000/styles/editor.css', [], '0.0.1');
    }
}

add_action('acf/init', 'register_theme_options_page');
function register_theme_options_page()
{
    if (!function_exists('acf_add_options_page')) {
        return;
    }

    acf_add_options_page(
        [
            'page_title'      => 'Theme options',
            'menu_title'      => 'Theme options',
            'menu_slug'       => 'theme-options',
            'capability'      => 'edit_posts',
            'show_in_graphql' => true,
        ]
    );
}

add_action('init', 'vh_register_page_template');
function vh_register_page_template()
{
    $post_type_object = get_post_type_object('page');
    $post_type_object->template = [
        ['vh/hero'],
        ['core/paragraph'],
        // ['vh/newsletter', ['lock' => ['remove' => 'false', 'move' => 'false']]],
    ];
}

add_action('init', 'vh_register_post_types');
function vh_register_post_types()
{
    register_post_type('tutorial', [
        'show_ui' => true,
        'labels'  => ['menu_name' => 'Tutorials'],
        'hierarchical' => false,
        'show_in_graphql' => true,
        'graphql_single_name' => 'tutorial',
        'graphql_plural_name' => 'tutorials',
        'public' => true,
        'publicly_queryable' => true,
        'show_in_rest' => true,
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'author']
    ]);

    register_taxonomy('tutorial-category', 'tutorial', [
        'labels'  => ['menu_name' => 'Tutorial categories'],
        'hierarchical' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'tutorialCategory',
        'graphql_plural_name' => 'tutorialCategories',
    ]);
}

add_action('graphql_register_types', 'vh_add_tutorial_category_to_tutorial_where_clause');
function vh_add_tutorial_category_to_tutorial_where_clause()
{
    register_graphql_field('RootQueryToTutorialConnectionWhereArgs', 'tutorialCategorySlug', [
        'type' => 'String',
        'description' => 'Filter by post objects that have the specific category slug',
    ]);
}

add_filter('graphql_post_object_connection_query_args', 'vh_filter_tutorials_by_tutorial_category_in_graphql', 10, 5);
function vh_filter_tutorials_by_tutorial_category_in_graphql($query_args, $source, $args, $context, $info)
{
    $tutorialCategorySlug = $args['where']['tutorialCategorySlug'];

    graphql_debug($tutorialCategorySlug, ['type' => 'ARGS_BREAKPOINT']);

    if (isset($tutorialCategorySlug)) {
        $query_args['tax_query'] = [
            [
                'taxonomy' => 'tutorial-category',
                'field' => 'slug',
                'terms' => $tutorialCategorySlug
            ]
        ];
    }

    return $query_args;
}

// Init blocks
foreach (glob(__DIR__ . '/blocks/build/*', GLOB_ONLYDIR) as $folder) {
    include "$folder/index.php";
}
