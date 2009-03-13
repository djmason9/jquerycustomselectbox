<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
				xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
				xmlns:str="http://exslt.org/strings"
				extension-element-prefixes="str">
	<xsl:import href="str/str.xsl"/>
    <xsl:output method="html" indent="yes"/>
	<!--
	<link type="text/css" rel="stylesheet" href="css.css"/>
	-->
	<xsl:template match="root">
	<html>
		<head>
			<script type="text/javascript">
				function isArray(obj) {
					return undefined != obj.length;
				}
				// display or hide the dependent html labels
				function setLabelProperties(lbl, objhtml) {
					// if parent field has data
					if (objhtml.value != '') {
						lbl.style.display = "inline";
						lbl.style.color = "red";
						lbl.style.backgroundColor='silver';
						lbl.style.font.weight = "bold";
					} else {
						lbl.style.display = "none";
					}
				}
				// display or hide the dependent html fields
				function setElementProperties(elemt, objhtml) {
					// if parent field has data
					if (objhtml.value != '') {
						//alert(elemt.name + " : " + objhtml.name + " : " + objhtml.value);
						if (elemt.type == 'radio' || elemt.type == 'checkbox' ) {
							elemt.style.display = "inline";
						} else {
							elemt.style.display = "block";
						}
					} else {
						elemt.style.display = "none";
					}
				}
				// display or hide the dependent html labels and fields
				function showDependantElement(ids, thisId) {
					// ids are comma delimited string of dependant html ids
					if (ids != null &amp;&amp; ids != "") {
						ids_array = ids.split(',');
						for (i=0;ids_array != null &amp;&amp; i&lt;ids_array.length;i++) {
							id = ids_array[i];
							dependant = document.getElementById(id);
							dependant_lbl = document.getElementById('lbl_' + id);
							me = document.getElementById(thisId);
							
							// make dependant visible if data entered in parent
							setLabelProperties(dependant_lbl, me);
							
							dependants = document.getElementsByName(dependant.name);
							for (j=0;j&lt;dependants.length;j++) {
								setElementProperties(dependants[j], me);
							}
							dependants_lbl = document.getElementsByName('lbl_' + id);
							for (j=0;j&lt;dependants_lbl.length;j++) {
								setLabelProperties(dependants_lbl[j], me);
							}
						}
					}
				}
			</script>
		</head>
		<body>
			<div id="formtabs">
				<!-- generate form tabs -->
				<xsl:for-each select="form">
					<xsl:variable name="tab_href" select="concat('#',@name)"/>
					<ul><li><a href="{$tab_href}"><xsl:value-of select="@name"/></a></li></ul>
				</xsl:for-each>
				<!-- generate form from the metaform xml -->
				<xsl:for-each select="form">
					<xsl:variable name="form_name" select="@name"/>
					<!-- generate div for each form node indicated in the metaform xml -->
					<div id="{$form_name}">
						<div class="section_title">
							<xsl:value-of select="@name"/>
						</div>
						<!-- generate as many splits as indicated in the metaform xml -->
						<xsl:for-each select="split">
							<div class="split">
								<!-- within each split, generate html tags respectively to -->
								<!-- metaform xml attribute element -->
								<xsl:apply-templates select="attribute"/>
							</div>
						</xsl:for-each>
						<div style="clear: both;"></div>
					</div>
				</xsl:for-each>
			</div>
		</body>
	</html>
	</xsl:template>
	<!-- define templates to produce html tags -->
    <xsl:template match="attribute">
		<!-- define variables -->
		<xsl:variable name="uri">
			<xsl:value-of select="@domain"/>Domain.<xsl:value-of select="@property"/>
		</xsl:variable>
		<xsl:variable name="id" select="@id"/>
		<xsl:variable name="seq_order" select="@seq_order"/>
		<xsl:variable name="dependent_ids" select="@dependent_ids"/>
		<xsl:variable name="dependency_note" select="@dependency_note"/>
		<xsl:variable name="dependence" select="@dependence"/>
		<xsl:variable name="label" select="@label"/>
		<xsl:variable name="classname" select="@classname"/>
		<xsl:variable name="size" select="@size"/>
		<xsl:variable name="rows" select="@rows"/>
		<xsl:variable name="cols" select="@cols"/>
		<xsl:variable name="db_value" select="@db_value"/>
		<xsl:variable name="options" select="@options"/>
		<!-- generate questions and answers -->
		<xsl:if test="@htmltype='input'">
			<xsl:choose>
				<!-- answer present -->
				<xsl:when test="($db_value != '')">
					<label id="lbl_{$id}" for="{$id}"><xsl:value-of select="@seq_order"/>. <xsl:value-of select="@label"/><space/><em><sup><xsl:value-of select="@dependency_note"/></sup></em>
						<input id="{$id}" name="{$uri}" type="text" class="{$classname}" size="{$size}" style="display:block;" value="{$db_value}" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)"></input>
					</label>
				</xsl:when>
				<!-- answer not present and check for dependence flag -->
				<xsl:otherwise>
					<!-- if dependence is defined in the metaform xml as 1 -->
					<xsl:choose>
						<!-- answer not present and is a dependant -->
						<xsl:when test="($dependence = '1')">
							<label id="lbl_{$id}" for="{$id}" style="display:none;"><xsl:value-of select="@seq_order"/>. <xsl:value-of select="@label"/><space/><em><sup><xsl:value-of select="@dependency_note"/></sup></em>
								<input id="{$id}" name="{$uri}" type="text" class="{$classname}" size="{$size}" style="display:none;" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)"></input>
							</label>
						</xsl:when>
						<!-- default condition - dependence flag is not set (anything other than 1) or it is not defined (is null) --> 
						<xsl:otherwise>
							<!-- answer not present and is not a dependant -->
							<label id="lbl_{$id}" for="{$id}"><xsl:value-of select="@seq_order"/>. <xsl:value-of select="@label"/><space/><em><sup><xsl:value-of select="@dependency_note"/></sup></em>
								<input id="{$id}" name="{$uri}" type="text" class="{$classname}" size="{$size}" style="display:block;" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)"></input>
							</label>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:otherwise>
			</xsl:choose>
			<br/>
		</xsl:if>
		<xsl:if test="@htmltype='select'">
			<xsl:choose>
				<!-- answer present -->
				<xsl:when test="($db_value != '')">
					<label id="lbl_{$id}" for="{$id}"><xsl:value-of select="@seq_order"/>. <xsl:value-of select="@label"/>
						<select id="{$id}" name="{$uri}" type="text" class="{$classname}" size="{$size}" style="display:block;" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
							<!-- process selected option tag -->
							<xsl:if test="($db_value != '')">
								<xsl:call-template name="tokenizedDb_values">
									<xsl:with-param name="t_db_values" select="$db_value"/>
								</xsl:call-template>
							</xsl:if>
							<!-- generate all option tags -->
							<option value=""></option>
							<xsl:call-template name="tokenizedOptions">
								<xsl:with-param name="t_options" select="str:split($options,',')"/>
							</xsl:call-template>
						</select>
					</label>
				</xsl:when>
				<xsl:otherwise>
					<!-- if dependence is defined in the metaform xml as 1 -->
					<xsl:choose>
						<!-- answer not present and is a dependant -->
						<xsl:when test="($dependence = '1')">
							<label id="lbl_{$id}" for="{$id}" style="display:none;"><xsl:value-of select="@seq_order"/>. <xsl:value-of select="@label"/>
								<select id="{$id}" name="{$uri}" type="text" class="{$classname}" size="{$size}" style="display:none;" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
									<!-- process selected option tag -->
									<xsl:if test="($db_value != '')">
										<xsl:call-template name="tokenizedDb_values">
											<xsl:with-param name="t_db_values" select="$db_value"/>
										</xsl:call-template>
									</xsl:if>
									<!-- generate all option tags -->
									<option value=""></option>
									<xsl:call-template name="tokenizedOptions">
										<xsl:with-param name="t_options" select="str:split($options,',')"/>
									</xsl:call-template>
								</select>
							</label>
						</xsl:when>
						<!-- default condition - dependence flag is not set (anything other than 1) or it is not defined (is null) --> 
						<xsl:otherwise>
							<!-- answer not present and is not a dependant -->
							<label id="lbl_{$id}" for="{$id}"><xsl:value-of select="@seq_order"/>. <xsl:value-of select="@label"/>
								<select id="{$id}" name="{$uri}" type="text" class="{$classname}" size="{$size}" style="display:block;" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
									<!-- process selected option tag -->
									<xsl:if test="($db_value != '')">
										<xsl:call-template name="tokenizedDb_values">
											<xsl:with-param name="t_db_values" select="$db_value"/>
										</xsl:call-template>
									</xsl:if>
									<!-- generate all option tags -->
									<option value=""></option>
									<xsl:call-template name="tokenizedOptions">
										<xsl:with-param name="t_options" select="str:split($options,',')"/>
									</xsl:call-template>
								</select>
							</label>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:otherwise>
			</xsl:choose>
			<br/>
		</xsl:if>
		<xsl:if test="@htmltype='select multiple'">
			<xsl:choose>
				<!-- answer present -->
				<xsl:when test="($db_value != '')">
					<label id="lbl_{$id}" for="{$id}"><xsl:value-of select="@seq_order"/>. <xsl:value-of select="@label"/>
						<select multiple="multiple" id="{$id}" name="{$uri}" type="text" class="{$classname}" size="{$size}" style="display:block;" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
							<!-- process selected option tags -->
							<xsl:if test="($db_value != '')">
								<xsl:call-template name="tokenizedDb_values">
									<xsl:with-param name="t_options" select="$options"/>
									<xsl:with-param name="t_db_values" select="$db_value"/>
								</xsl:call-template>
							</xsl:if>
							<!-- generate all option tags -->
							<option value=""></option>
							<xsl:call-template name="tokenizedOptions">
								<xsl:with-param name="t_options" select="str:split($options,',')"/>
							</xsl:call-template>
						</select>
					</label>
				</xsl:when>
				<!-- answer not present and check for dependence flag -->
				<xsl:otherwise>
					<!-- if dependence is defined in the metaform xml as 1 -->
					<xsl:choose>
						<!-- answer not present and is a dependant -->
						<xsl:when test="($dependence = '1')">
							<label id="lbl_{$id}" for="{$id}" style="display:none;"><xsl:value-of select="@seq_order"/>. <xsl:value-of select="@label"/>
								<select multiple="multiple" id="{$id}" name="{$uri}" type="text" class="{$classname}" size="{$size}" style="display:none;" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
									<!-- process selected option tags -->
									<xsl:if test="($db_value != '')">
										<xsl:call-template name="tokenizedDb_values">
											<xsl:with-param name="t_options" select="$options"/>
											<xsl:with-param name="t_db_values" select="$db_value"/>
										</xsl:call-template>
									</xsl:if>
									<!-- generate all option tags -->
									<option value=""></option>
									<xsl:call-template name="tokenizedOptions">
										<xsl:with-param name="t_options" select="str:split($options,',')"/>
									</xsl:call-template>
								</select>
							</label>
						</xsl:when>
						<!-- default condition - dependence flag is not set (anything other than 1) or it is not defined (is null) --> 
						<xsl:otherwise>
							<!-- answer not present and is not a dependant -->
							<label id="lbl_{$id}" for="{$id}"><xsl:value-of select="@seq_order"/>. <xsl:value-of select="@label"/>
								<select multiple="multiple" id="{$id}" name="{$uri}" type="text" class="{$classname}" size="{$size}" style="display:block;" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
									<!-- process selected option tags -->
									<xsl:if test="($db_value != '')">
										<xsl:call-template name="tokenizedDb_values">
											<xsl:with-param name="t_options" select="$options"/>
											<xsl:with-param name="t_db_values" select="$db_value"/>
										</xsl:call-template>
									</xsl:if>
									<!-- generate all option tags -->
									<option value=""></option>
									<xsl:call-template name="tokenizedOptions">
										<xsl:with-param name="t_options" select="str:split($options,',')"/>
									</xsl:call-template>
								</select>
							</label>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:otherwise>
			</xsl:choose>
			<br/>
		</xsl:if>		
		<xsl:if test="@htmltype='radio'">
			<xsl:choose>
				<xsl:when test="($db_value != '')">
					<label id="lbl_{$id}" for="{$id}" style="display:block;"><xsl:value-of select="@seq_order"/>. <xsl:value-of select="@label"/><space/><em><sup><xsl:value-of select="@dependency_note"/></sup></em></label>
				</xsl:when>
				<xsl:otherwise>
					<xsl:choose>
						<xsl:when test="($dependence = '1')">
							<label id="lbl_{$id}" for="{$id}" style="display:none;"><xsl:value-of select="@seq_order"/>. <xsl:value-of select="@label"/><space/><em><sup><xsl:value-of select="@dependency_note"/></sup></em></label>
						</xsl:when>
						<xsl:otherwise>
							<label id="lbl_{$id}" for="{$id}" style="display:block;"><xsl:value-of select="@seq_order"/>. <xsl:value-of select="@label"/><space/><em><sup><xsl:value-of select="@dependency_note"/></sup></em></label>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:for-each select="str:split($options,',')">
				<xsl:choose>
					<xsl:when test="($db_value != '')">
						<xsl:choose>
							<xsl:when test="($db_value = .)">
								<input id="{$id}" name="{$uri}" type="radio" class="{$classname}" style="display:inline;" value="{.}" checked="checked" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
									<option value="{.}"><label name="lbl_{$id}" for="{$id}" style='color:silver;display:inline;'><strong><xsl:value-of select="."/></strong></label></option>
								</input>
							</xsl:when>
							<xsl:otherwise>
								<xsl:choose>
									<xsl:when test="($dependence = '1')">
										<input id="{$id}" name="{$uri}" type="radio" class="{$classname}" style="display:none;" value="{.}" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
											<option value="{.}"><label name="lbl_{$id}" for="{$id}" style="display:none;"><xsl:value-of select="."/></label></option>
										</input>
									</xsl:when>
									<xsl:otherwise>
										<input id="{$id}" name="{$uri}" type="radio" class="{$classname}" style="display:inline;" value="{.}" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
											<option value="{.}"><label name="lbl_{$id}" for="{$id}" style="display:inline;"><xsl:value-of select="."/></label></option>
										</input>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:otherwise>
						<xsl:choose>
							<xsl:when test="($dependence = '1')">
								<input id="{$id}" name="{$uri}" type="radio" class="{$classname}" style="display:none;" value="{.}" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
									<option value="{.}"><label name="lbl_{$id}" for="{$id}" style="display:none;"><xsl:value-of select="."/></label></option>
								</input>
							</xsl:when>
							<xsl:otherwise>
								<input id="{$id}" name="{$uri}" type="radio" class="{$classname}" style="display:inline;" value="{.}" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
									<option value="{.}"><label name="lbl_{$id}" for="{$id}" style="display:inline;"><xsl:value-of select="."/></label></option>
								</input>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:for-each>
			<br/>
		</xsl:if>
		<xsl:if test="@htmltype='checkbox'">
			<xsl:choose>
				<xsl:when test="($db_value != '')">
					<label id="lbl_{$id}" for="{$id}" style="display:inline;"><xsl:value-of select="@seq_order"/>. <xsl:value-of select="@label"/><space/><em><sup><xsl:value-of select="@dependency_note"/></sup></em></label>
				</xsl:when>
				<xsl:otherwise>
					<xsl:choose>
						<xsl:when test="($dependence = '1')">
							<label id="lbl_{$id}" for="{$id}" style="display:none;"><xsl:value-of select="@seq_order"/>. <xsl:value-of select="@label"/><space/><em><sup><xsl:value-of select="@dependency_note"/></sup></em></label>
						</xsl:when>
						<xsl:otherwise>
							<label id="lbl_{$id}" for="{$id}" style="display:block;"><xsl:value-of select="@seq_order"/>. <xsl:value-of select="@label"/><space/><em><sup><xsl:value-of select="@dependency_note"/></sup></em></label>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:for-each select="str:split($options,',')">
				<xsl:choose>
					<xsl:when test="($db_value != '')">
						<xsl:choose>
							<xsl:when test="($db_value = .)">
								<input id="{$id}" name="{$uri}" type="checkbox" class="{$classname}" style="display:inline;" value="{.}" checked="checked" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
									<option value="{.}"><label name="lbl_{$id}" for="{$id}" style='color:silver;display:inline;'><strong><xsl:value-of select="."/></strong></label></option>
								</input>
							</xsl:when>
							<xsl:otherwise>
								<xsl:choose>
									<xsl:when test="($dependence = '1')">
										<input id="{$id}" name="{$uri}" type="checkbox" class="{$classname}" style="display:none;" value="{.}" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
											<option value="{.}"><label name="lbl_{$id}" for="{$id}" style="display:none;"><xsl:value-of select="."/></label></option>
										</input>
									</xsl:when>
									<xsl:otherwise>
										<input id="{$id}" name="{$uri}" type="checkbox" class="{$classname}" style="display:inline;" value="{.}" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
											<option value="{.}"><label name="lbl_{$id}" for="{$id}" style="display:inline;"><xsl:value-of select="."/></label></option>
										</input>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:otherwise>
						<xsl:choose>
							<xsl:when test="($dependence = '1')">
								<input id="{$id}" name="{$uri}" type="checkbox" class="{$classname}" style="display:none;" value="{.}" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
									<option value="{.}"><label name="lbl_{$id}" for="{$id}" style="display:none;"><xsl:value-of select="."/></label></option>
								</input>
							</xsl:when>
							<xsl:otherwise>
								<input id="{$id}" name="{$uri}" type="checkbox" class="{$classname}" style="display:inline;" value="{.}" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
									<option value="{.}"><label name="lbl_{$id}" for="{$id}" style="display:inline;"><xsl:value-of select="."/></label></option>
								</input>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:for-each>
			<br/>
		</xsl:if>
		<xsl:if test="@htmltype='textarea'">
			<label id="lbl_{$id}" for="{$id}" style="display:block;"><xsl:value-of select="@seq_order"/>. <xsl:value-of select="@label"/><space/><em><sup><xsl:value-of select="@dependency_note"/></sup></em>
				<xsl:choose>
					<xsl:when test="($db_value != '')">
						<textarea id="{$id}" name="{$uri}" type="text" class="{$classname}" size="{$size}" rows="{$rows}" cols="{$cols}" style="display:block;" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)">
							<xsl:value-of select="$db_value"/>
						</textarea>
					</xsl:when>
					<xsl:otherwise>
						<xsl:choose>
							<xsl:when test="($dependence = '1')">
								<textarea id="{$id}" name="{$uri}" type="text" class="{$classname}" size="{$size}" rows="{$rows}" cols="{$cols}" style="display:none;" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)"/>
							</xsl:when>
							<xsl:otherwise>	
								<textarea id="{$id}" name="{$uri}" type="text" class="{$classname}" size="{$size}" rows="{$rows}" cols="{$cols}" style="display:block;" onChange="javascript:showDependantElement(&quot;{$dependent_ids}&quot;, &quot;{$id}&quot;)"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:otherwise>
				</xsl:choose>
			</label>
			<br/>
		</xsl:if>
    </xsl:template>
	<!-- template to generate option html tags -->
	<xsl:template name="tokenizedOptions">
		<xsl:param name="t_options"/>
		<xsl:for-each select="$t_options">
			<option value="{.}"><label><xsl:value-of select="."/></label></option>
		</xsl:for-each>
	</xsl:template>
	<!-- template to generate selected options html tags -->
	<xsl:template name="tokenizedDb_values">
		<xsl:param name="t_db_values"/>
		<!-- generate selected options, and disable the already stored db values -->
		<xsl:for-each select="str:split($t_db_values,',')">
			<option value="{.}" selected="selected" disabled="disabled"><label style="color:silver"><strong><xsl:value-of select="."/></strong></label></option>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>    