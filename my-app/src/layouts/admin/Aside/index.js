function Aside() {
  return (
    <nav className="navbar-default navbar-static-side" role="navigation">
      <div className="sidebar-collapse">
        <ul className="nav metismenu" id="side-menu">
          <li className="nav-header">
            <div className="dropdown profile-element">
              {" "}
              <span>
                <img
                  alt="image"
                  className="img-circle"
                  src="img/profile_small.jpg"
                />
              </span>
              <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                <span className="clear">
                  {" "}
                  <span className="block m-t-xs">
                    {" "}
                    <strong className="font-bold">David Williams</strong>
                  </span>{" "}
                  <span className="text-muted text-xs block">
                    Art Director <b className="caret"></b>
                  </span>{" "}
                </span>{" "}
              </a>
              <ul className="dropdown-menu animated fadeInRight m-t-xs">
                <li>
                  <a href="profile.html">Profile</a>
                </li>
                <li>
                  <a href="contacts.html">Contacts</a>
                </li>
                <li>
                  <a href="mailbox.html">Mailbox</a>
                </li>
                <li className="divider"></li>
                <li>
                  <a href="login.html">Logout</a>
                </li>
              </ul>
            </div>
            <div className="logo-element">IN+</div>
          </li>
          <li className="active">
            <a href="index.html">
              <i className="fa fa-th-large"></i>{" "}
              <span className="nav-label">Dashboards</span>{" "}
              <span className="fa arrow"></span>
            </a>
            <ul className="nav nav-second-level">
              <li>
                <a href="index.html">Dashboard v.1</a>
              </li>
              <li className="active">
                <a href="dashboard_2.html">Dashboard v.2</a>
              </li>
              <li>
                <a href="dashboard_3.html">Dashboard v.3</a>
              </li>
              <li>
                <a href="dashboard_4_1.html">Dashboard v.4</a>
              </li>
              <li>
                <a href="dashboard_5.html">Dashboard v.5 </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="layouts.html">
              <i className="fa fa-diamond"></i>{" "}
              <span className="nav-label">Layouts</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-bar-chart-o"></i>{" "}
              <span className="nav-label">Graphs</span>
              <span className="fa arrow"></span>
            </a>
            <ul className="nav nav-second-level collapse">
              <li>
                <a href="graph_flot.html">Flot Charts</a>
              </li>
              <li>
                <a href="graph_morris.html">Morris.js Charts</a>
              </li>
              <li>
                <a href="graph_rickshaw.html">Rickshaw Charts</a>
              </li>
              <li>
                <a href="graph_chartjs.html">Chart.js</a>
              </li>
              <li>
                <a href="graph_chartist.html">Chartist</a>
              </li>
              <li>
                <a href="c3.html">c3 charts</a>
              </li>
              <li>
                <a href="graph_peity.html">Peity Charts</a>
              </li>
              <li>
                <a href="graph_sparkline.html">Sparkline Charts</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="mailbox.html">
              <i className="fa fa-envelope"></i>{" "}
              <span className="nav-label">Mailbox </span>
              <span className="label label-warning pull-right">16/24</span>
            </a>
            <ul className="nav nav-second-level collapse">
              <li>
                <a href="mailbox.html">Inbox</a>
              </li>
              <li>
                <a href="mail_detail.html">Email view</a>
              </li>
              <li>
                <a href="mail_compose.html">Compose email</a>
              </li>
              <li>
                <a href="email_template.html">Email templates</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="metrics.html">
              <i className="fa fa-pie-chart"></i>{" "}
              <span className="nav-label">Metrics</span>{" "}
            </a>
          </li>
          <li>
            <a href="widgets.html">
              <i className="fa fa-flask"></i> <span className="nav-label">Widgets</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-edit"></i> <span className="nav-label">Forms</span>
              <span className="fa arrow"></span>
            </a>
            <ul className="nav nav-second-level collapse">
              <li>
                <a href="form_basic.html">Basic form</a>
              </li>
              <li>
                <a href="form_advanced.html">Advanced Plugins</a>
              </li>
              <li>
                <a href="form_wizard.html">Wizard</a>
              </li>
              <li>
                <a href="form_file_upload.html">File Upload</a>
              </li>
              <li>
                <a href="form_editors.html">Text Editor</a>
              </li>
              <li>
                <a href="form_autocomplete.html">Autocomplete</a>
              </li>
              <li>
                <a href="form_markdown.html">Markdown</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-flask"></i>{" "}
              <span className="nav-label">UI Elements</span>
              <span className="fa arrow"></span>
            </a>
            <ul className="nav nav-second-level collapse">
              <li>
                <a href="typography.html">Typography</a>
              </li>
              <li>
                <a href="icons.html">Icons</a>
              </li>
              <li>
                <a href="draggable_panels.html">Draggable Panels</a>
              </li>{" "}
              <li>
                <a href="resizeable_panels.html">Resizeable Panels</a>
              </li>
              <li>
                <a href="buttons.html">Buttons</a>
              </li>
              <li>
                <a href="video.html">Video</a>
              </li>
              <li>
                <a href="tabs_panels.html">Panels</a>
              </li>
              <li>
                <a href="tabs.html">Tabs</a>
              </li>
              <li>
                <a href="notifications.html">Notifications & Tooltips</a>
              </li>
              <li>
                <a href="helper_classNamees.html">Helper css classNamees</a>
              </li>
              <li>
                <a href="badges_labels.html">Badges, Labels, Progress</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="grid_options.html">
              <i className="fa fa-laptop"></i>{" "}
              <span className="nav-label">Grid options</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-table"></i> <span className="nav-label">Tables</span>
              <span className="fa arrow"></span>
            </a>
            <ul className="nav nav-second-level collapse">
              <li>
                <a href="table_basic.html">Static Tables</a>
              </li>
              <li>
                <a href="table_data_tables.html">Data Tables</a>
              </li>
              <li>
                <a href="table_foo_table.html">Foo Tables</a>
              </li>
              <li>
                <a href="jq_grid.html">jqGrid</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-shopping-cart"></i>{" "}
              <span className="nav-label">E-commerce</span>
              <span className="fa arrow"></span>
            </a>
            <ul className="nav nav-second-level collapse">
              <li>
                <a href="ecommerce_products_grid.html">Products grid</a>
              </li>
              <li>
                <a href="ecommerce_product_list.html">Products list</a>
              </li>
              <li>
                <a href="ecommerce_product.html">Product edit</a>
              </li>
              <li>
                <a href="ecommerce_product_detail.html">Product detail</a>
              </li>
              <li>
                <a href="ecommerce-cart.html">Cart</a>
              </li>
              <li>
                <a href="ecommerce-orders.html">Orders</a>
              </li>
              <li>
                <a href="ecommerce_payments.html">Credit Card form</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-picture-o"></i>{" "}
              <span className="nav-label">Gallery</span>
              <span className="fa arrow"></span>
            </a>
            <ul className="nav nav-second-level collapse">
              <li>
                <a href="basic_gallery.html">Lightbox Gallery</a>
              </li>
              <li>
                <a href="slick_carousel.html">Slick Carousel</a>
              </li>
              <li>
                <a href="carousel.html">Bootstrap Carousel</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-sitemap"></i>{" "}
              <span className="nav-label">Menu Levels </span>
              <span className="fa arrow"></span>
            </a>
            <ul className="nav nav-second-level collapse">
              <li>
                <a href="#">
                  Third Level <span className="fa arrow"></span>
                </a>
                <ul className="nav nav-third-level">
                  <li>
                    <a href="#">Third Level Item</a>
                  </li>
                  <li>
                    <a href="#">Third Level Item</a>
                  </li>
                  <li>
                    <a href="#">Third Level Item</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Second Level Item</a>
              </li>
              <li>
                <a href="#">Second Level Item</a>
              </li>
              <li>
                <a href="#">Second Level Item</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="css_animation.html">
              <i className="fa fa-magic"></i>{" "}
              <span className="nav-label">CSS Animations </span>
              <span className="label label-info pull-right">62</span>
            </a>
          </li>
          <li className="landing_link">
            <a target="_blank" href="landing.html">
              <i className="fa fa-star"></i>{" "}
              <span className="nav-label">Landing Page</span>{" "}
              <span className="label label-warning pull-right">NEW</span>
            </a>
          </li>
          <li className="special_link">
            <a href="package.html">
              <i className="fa fa-database"></i>{" "}
              <span className="nav-label">Package</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Aside;
