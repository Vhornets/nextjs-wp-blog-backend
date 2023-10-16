<?php
function register_block_newsletter()
{
    register_block_type(
        __DIR__,
        // [
        //     'render_callback' => '',
        // ]
    );
}
add_action('init', 'register_block_newsletter');
